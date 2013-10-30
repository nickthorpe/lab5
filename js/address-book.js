/* address-book.js
    this is where you will add your JavaScript to complete Lab 5
*/


/* sortObjArray()
    sorts an array of objects by a given property name
    the property values are compared using standard 
    operators, so this will work for string, numeric,
    boolean, or date values

    objArray        array of objects to sort
    propName        property name to sort by

    returns undefined (array is sorted in place)
*/

$(function() {
  // Document is ready
  var entries = Employees.entries;
  render(entries);
  $( '.sort-ui .btn' ).click(function() {
        var sortBtn = $(this);
        var sortAttr = sortBtn.attr('data-sortby');
        sortObjArray(entries, sortAttr);
        render(entries);
        $.each(sortBtn.siblings(), function() {
            var sib = $(this);
            sib.removeClass('active')
        });
        sortBtn.addClass('active');
    });
  $('.sort-ui .btn').popover({
        content: function() {
            return 'Click to Resort by ' + $(this).html();
        },    
        container: 'body',
        trigger: 'hover',
        placement: 'bottom'
    })
});



function sortObjArray(objArray, propName) {
    if (!objArray.sort)
        throw new Error('The objArray parameter does not seem to be an array (no sort method)');

    //sort the array supplying a custom compare function
    objArray.sort(function(a,b) {
        
        //note: this compares only one property of the objects
        //see the optional step where you can add support for 
        //a secondary sort key (i.e., sort by another property)
        //if the first property values are equal
        if (a[propName] < b[propName])
            return -1;
        else if (a[propName] === b[propName])
            return 0;
        else
            return 1;
    });
} //sortObjArray()

function render(entries) {
	var address = $('.address-book');
	var template = $('.template');
	var instance;
    address.hide();
	address.empty();
	$.each(entries, function() {
		instance = template.clone();
		instance.find('.last').html(this.last);
        instance.find('.first').html(this.first);
        instance.find('.title').html(this.title);
        instance.find('.dept').html(this.dept);
        instance.find('.pic').attr({
            src: this.pic,
            alt: 'Picture of ' + this.first
        });
   		instance.removeClass('template');
        address.append(instance);
        address.fadeIn();       
	});
} 

    
