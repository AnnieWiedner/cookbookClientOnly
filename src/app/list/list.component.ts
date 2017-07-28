import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

class Recipe {
  id: number;
  instructions: string;
  image_url: string;
  user_id: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent {
  recipes: Recipe[] = [];
  newRecipe: Recipe = new Recipe();
  updateRecipe: Recipe = new Recipe();

  constructor(private http: Http, private router: Router){
    this.getRecipes();
  }

  getRecipes() {
    this.http.get('https://cookbooks-server.herokuapp.com/recipes?token=' + window.localStorage.token).subscribe(response => {
      this.recipes = response.json()
    }, err => {
      if(err.status === 403) {
        this.router.navigate(['/login'])
      }else{
        alert("ERROR");
      }
    })
  }

  postRecipe() {
    this.http.post('https://cookbooks-server.herokuapp.com/recipes?token=' + window.localStorage.token, this.newRecipe).subscribe(response => {
      this.recipes = response.json()
    }, err => {
      if (err.status === 403){
        this.router.navigate(['/login'])
      }else{
        alert("ERROR");
      }
    })
  }

  patchRecipe() {
    this.http.patch('https://cookbooks-server.herokuapp.com/recipes/' + this.updateRecipe.id, this.updateRecipe).subscribe(response =>
      this.recipes = response.json()
    )
  }


  editRecipe(recipe) {
    this.updateRecipe = Object.assign({}, recipe);
  }

  goToRecipe(recipe) {
    this.router.navigate(['/recipes/', recipe.id])
  }

  logout(){
    window.localStorage.clear();
    this.router.navigate(['/login'])
  }

  scroll() {
    var form = document.getElementById("form")
    form.scrollIntoView();
    // highlight the form
  }

}
