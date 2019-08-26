const summation = (accumulator, currentValue) => accumulator + currentValue;

$( function () {

  var id = new Identifier();
  var stats = [0, 0, 0, 0];
  var prob1 = [0.25, 0.25, 0.25, 0.25];
  var prob2 = [0.4, 0.1, 0.3, 0.2];
  var probs = prob1;

	var equalBucketWeights = new OO.ui.ToggleSwitchWidget( {
      	label: 'Equal weights',
        value: true
      } ),
      stepUpButton = new OO.ui.ButtonWidget( {
        label: 'Step',
        icon: 'add',
        title: 'Step'
      } ),
      regenIdentifierButton = new OO.ui.ButtonWidget( {
        label: 'Regenerate',
        icon: 'die',
        title: 'Regenerate'
      } );

  function updateIdentifierInfo() {
    $( "#hex-identifier" ).text(id.hex);
    $( "#bucket-info" ).text(Sampling.inBucket(id.randomComponent(), probs))
  }
  function resetBucketStats() {
    stats = [0, 0, 0, 0]; // new Array(4).fill(0);
    let b = Sampling.inBucket(id.randomComponent(), probs) - 1
    stats[b]++;
    updateIdentifierInfo();
    updateBucketStatsTable();
  }
  function updateBucketStatsTable() {
    let header_row = "<th align='left'>Bucket</th>";
    let counts_row = "<td>IDs</td>";
    let props_row = "<td>Proportion</td>";
    let expect_row = "<td>Expected</td>";
    let total_ids = stats.reduce(summation);
    for (var i = 0; i < stats.length; i++) {
      header_row += "<th align='right'>" + (i + 1) + "</th>";
      counts_row += "<td align='right'>" + stats[i] + "</td>";
      props_row += "<td align='right'>" + Math.round(100 * stats[i] / total_ids) + "%</td>";
      expect_row += "<td align='right'>" + 100 * probs[i] + "%</td>";
    }
    let row_sep = "</tr><tr>";
    let stats_table = "<table><tr>" + header_row + row_sep + counts_row + row_sep + props_row + row_sep + expect_row + "</tr></table>";
    $( "#bucketing-stats" ).html(stats_table);
  }
  
  equalBucketWeights.on( 'change', function ( item ) {
    probs = item ? prob1 : prob2;
    resetBucketStats();
  } )

  stepUpButton.on( 'click', function ( item ) {
    id.step();
    updateIdentifierInfo();
  } );

  regenIdentifierButton.on( 'click', function ( item ) {
    id = new Identifier();
    let b = Sampling.inBucket(id.randomComponent(), probs) - 1
    stats[b]++;
    updateIdentifierInfo();
    updateBucketStatsTable();
  } );

	// Append to the wrapper
  $( '#bucketing-settings' ).append( equalBucketWeights.$element );
	$( '#identifier-btns' ).append(
		stepUpButton.$element,
    regenIdentifierButton.$element
	);

  resetBucketStats();
} );
