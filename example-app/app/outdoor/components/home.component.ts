import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bc-home',
  template: `
    <div class="flex-container">
        <div class="flex-item">
        <img class="img-fluid" src="https://www.outdoorproject.com/sites/all/themes/odp30/images/svg/outdoor-project-logo-white.svg" alt="Outdoor Project">
        </div>

        <div class="flex-item">
        <p>Love the outdoors? So do we!</p>
        <br>
        <br>
        <p>
        Sign up to receive our weekly newsletter packed with the best adventure guides, travel ideas, news and stories.
        </p>
        </div>

        <div class="flex-item">
        <form>
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" class="form-control form-control-lg" id="email" placeholder="Email">
        </div>
        <button type="submit" class="btn btn-primary btn-lg">Count me in!</button>
        <p>
        <a href="#">I'm already a member.</a>
        </p>
        </form>
        </div>
    </div>
  `,
  styles: [
    `
    .flex-container {
        height: 100%;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: black;
    }

    .flex-item {
        line-height: 20px;
        font-weight: bold;
        font-size: 2em;
        text-align: center;
        color: white;
        width: 50%;
    }

    .form-wrapper {
      display: flex;
    }
    .center {
      justify-content: center;
    }
    `,
  ],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
