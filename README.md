# Panier

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Mock mode
With a mock API , you can start developing without waiting for the backend team. you start writing your Angular Application, plug it to a mock API then switch to the real backend when it's ready.This can help you design the potential shapes of the server's responses in collaboration with the backend team.  

Both prod and mock are implemented in this project but only the mock is functional. 
  
We create an `environment` directory which contains configuration files for both modes. each file specify which service we're going to use knowing that we implement specific service for the specific mode( in our case for the http and api url  services).  
  
The configuration of the switching between modes is done in `angular.json` file to tell which environment we're going to use when serving the app.
  
 ![image](https://user-images.githubusercontent.com/17089273/209127737-abfda319-837d-40e0-b1c6-7f0cdc7a8f4f.png)
  
The default envioronment is `environment.ts`. so we will not need to make a file replacement or add an option to the `ng serve` command.  
In this project `ng serve` is runned for the Mock mode. 

## Naming

Every obsevable name will be followed by `$` to distinguish them from other variables.

## Store

In this project we are using the design pattern `NGXS`, which will manage all states of the application.  
States can be found under `store` repository of the `shared` repository.  

![image](https://user-images.githubusercontent.com/17089273/209131510-f9bd2ada-fd9c-4463-b8ef-ed2827d39c5b.png)  

NB: to use `NGXS` you have to install `@ngxs/store` by `npm install @ngxs/store --save`. 

For more help check out this [NGXS](https://www.ngxs.io/getting-started/why) page

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


