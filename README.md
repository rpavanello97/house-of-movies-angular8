## Instalação

1. clone o repositório `git clone git@github.com:RenanRB/curso-angular.git`
2. Entre no projeto e instale as dependencias `npm install`
3. Caso você queira alguma aula específica lembre que voce pode pegar direto das nossas release fazendo download do zip ou clonando a partir do commit hash, URL: https://github.com/RenanRB/curso-angular/tags

## Ambiente Local

Execute `ng serve` para que o projeto suba localmente. Acesse a url `http://localhost:4200/`. O projeto já está com reload automático conforme as alterações que você realizar no código

## Simulando o Back-end

Execute `npm install -g json-server` para instalar globalmente o servidor json. Após a instalação entre na pasta do projeto e execute `json-server --watch db.json`, com isso um servidor será inicializado na url `http://localhost:3000/`, após a inicialização sera possível realizar requisições http.


Tecnicas avançadas em Angular 8

Tecnologies and LIbraries
    1) Angular Material
    2) Json-Server
    3) RxJS

Commands
	
    Working with json-server
    1) npm install -g json-server
    2) json-server --watch db.json

### NOTES
TO CREATE THE MODULE TO THE COMPONENTS
	-shared/components/fields 

TO CREATE COMPONENTS TO FIELDS
	- shared/components/fields
		input-text
		input-number
		input-date
		input-textarea
		input-select

@Input() titulo: string
@Input() formGroup
@Input() controlName: string

get formControl(): AbstractControl {

}
	
not use the ngOnInit

import on components
	MaterialModule,
	ReactiveFormsModule,
	FormsModule

import on constructor
	ValidateFieldsService

import fieldsModules on moviesModule 

OBS: check tslint.json to see the selector directive
     Try to let the message in a variable.


TODO: 
	-Make the other components (number,date, select)
	-Try to let the message in a variable.
	
	
   