$(document).ready(function(){

	var source = $('#todo-list-item-template').html();  
	var todoTemplate = Handlebars.compile(source);

	//add-todo-btn 
	$('.addtodo').click(function(e){
		$(this).closest('.actions').siblings('.content').prop('contenteditable', true).focus();
	})
			

	$('#todo-list')

		.on('dblclick', '.content', function(e){
			$(this).prop('contenteditable', true).focus();
			$(this).closest('li').addClass('active');
		})

		.on('blur', '.content', function(e){

			var isNewItem = $(this).closest('li').is('.new');
			
			//create#
			if (isNewItem) {

				var newTodo = $(this).text();

				newTodo = newTodo.trim();

				if (newTodo.length > 0) {
						newTodo = {
						is_complete: false,
						content: newTodo,
						}

						var li = todoTemplate(newTodo);

						$(e.currentTarget).closest('li').before(li);
				}

				

				$(e.currentTarget).empty();

			//update
			} else{
				 $(this).prop('contenteditable', false);
				 $(this).closest('li').removeClass('active');
			}
			
		})
		//delete
		.on('click', '.delete', function(e){

			var result = confirm('Are you sure you want to delete this item?');

			if(result) {
				$(this).closest('li').remove();
			}
			
		})
		//complete
		.on('click', '.checkbox', function(e){
			$(this).closest('li').toggleClass('complete');
		})
		//hide
		.on('click','.hide-btn', function(e){

			$(this).siblings('ul').find('.complete').toggle();

			//判斷字串
			$(this).html() == 'Hide Completed' ? $(this).html('Show Completed') : $(this).html('Hide Completed');

		});

		//sort
		$('#todo-list').find('ul').sortable({
			items: 'li:not(.new)'
		});
       
        


});