//pseudo code
// check the code if its working
// make it personalized to build a sharing receipe site
// did some styling alone and added more using AI and google 
// made changes to code using AI and debuging the delete and edit button until they worked 
// last step is to host the project using render after pushing it to github


// This section handles the delete buttons
let deleteButtons = document.getElementsByClassName("delete-recipe");

Array.from(deleteButtons).forEach(function (element) {
  element.addEventListener('click', function () {
    const recipeId = this.getAttribute('data-id');


    if (confirm('Are you sure you want to delete this recipe?')) {
      fetch(`/recipes/${recipeId}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            window.location.reload();
          } else {
            console.error('Failed to delete recipe.');
          }
        })
        .catch(error => console.error('Error deleting recipe:', error));
    }
  });
});

// This section handles the edit buttons
let editButtons = document.getElementsByClassName("edit-recipe");

Array.from(editButtons).forEach(function (element) {
  element.addEventListener('click', function () {
    const recipeId = this.getAttribute('data-id');
    const recipeItem = this.closest('.recipe-item');

    const currentTitle = recipeItem.querySelector('h4').innerText;
    const currentImage = recipeItem.querySelector('img').src;
    // Note: The following lines had an error in the previous response, corrected here.
    const currentIngredients = recipeItem.querySelector('p:nth-child(3)').innerText.replace('Ingredients: ', '');
    const currentSteps = recipeItem.querySelector('p:nth-child(4)').innerText.replace('Steps: ', '');

    const newTitle = prompt('Edit Recipe Title:', currentTitle);
    if (newTitle === null) return;

    const newImage = prompt('Edit Image URL:', currentImage);
    if (newImage === null) return;

    const newIngredients = prompt('Edit Ingredients:', currentIngredients);
    if (newIngredients === null) return;

    const newSteps = prompt('Edit Steps:', currentSteps);
    if (newSteps === null) return;

    fetch(`/recipes/${recipeId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'title': newTitle,
        'imageUrl': newImage,
        'ingredients': newIngredients,
        'steps': newSteps
      })
    })
      .then(response => {
        if (response.ok) {
          window.location.reload();
        } else {
          console.error('Failed to update recipe.');
        }
      })
      .catch(error => console.error('Error updating recipe:', error));
  });
});


