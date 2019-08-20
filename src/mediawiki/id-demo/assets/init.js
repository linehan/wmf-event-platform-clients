$( function () {

  var id = new Identifier()

	var numberOfBuckets = new OO.ui.NumberInputWidget( {
        label: 'Number of buckets',
        input: { value: 1 },
        min: 1, max: 16,
        classes: [ 'number-buckets' ]
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
    $( "#string-identifier" ).text(id.asString(separator = "·"));
    $( "#bucket-info" ).text(id.inBucket(numberOfBuckets.getValue()))
  }

  numberOfBuckets.on( 'change', function ( item ) {
    updateIdentifierInfo();
  } );

  stepUpButton.on( 'click', function ( item ) {
    id.step();
    updateIdentifierInfo();
  } );

  regenIdentifierButton.on( 'click', function ( item ) {
    id = new Identifier();
    updateIdentifierInfo();
  } );

	// Append to the wrapper
  $( '#bucketing-settings' ).append( numberOfBuckets.$element );
	$( '#identifier-btns' ).append(
		stepUpButton.$element,
    regenIdentifierButton.$element
	);

  updateIdentifierInfo();
} );
