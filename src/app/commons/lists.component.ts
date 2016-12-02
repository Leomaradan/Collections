import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {  Http } from '@angular/http';

import { Genre, Auteur, Serie, Errors, Type } from '.';
import { ListsService, Lists } from './lists.service';

enum ListsComponentType { Genre, Auteur, Serie };

@Component({
    selector: 'app-lists',
    templateUrl: './views/lists.component.html',
    styleUrls: ['./views/lists.component.scss']
})
export class ListsComponent implements OnInit {

    appTitre: string = "Genre";

    appUrl: string = "genre";

    loading: number = 0;

    private currentType: ListsComponentType;
    
    listTypes: Type[] = [];

    features: string[];

    items: { data: Lists[], pagination: any } = { data: [], pagination: {} };

    commonsService: ListsService<Lists>;

    public orderField = "titre";
    public orderDirection = "ASC";

    errors: Errors = new Errors();

    constructor(protected route: ActivatedRoute, protected router: Router, private http: Http) { }

    ngOnInit() {
        


        this.route.params.forEach((params: Params) => {
            let listType = params['type'];
            let page = (+params['page']) ? +params['page'] : 1;

            this.loading++;

            switch (listType) {
                case 'serie':
                    this.currentType = ListsComponentType.Serie;
                    this.commonsService = new ListsService<Serie>(this.http);
                    this.appTitre = 'Série';
                    this.features = Serie.features;
                    break;
                case 'auteur':
                    this.currentType = ListsComponentType.Auteur;
                    this.commonsService = new ListsService<Auteur>(this.http);
                    this.appTitre = 'Auteur';
                    this.features = Auteur.features;
                    break;
                case 'genre':
                default:
                    this.currentType = ListsComponentType.Genre;
                    listType = 'genre';
                    this.commonsService = new ListsService<Genre>(this.http);
                    this.appTitre = 'Genre';
                    this.features = Genre.features;
                    break;
            }

            this.commonsService.setUrl(listType);
            this.appUrl = listType;
            
            this.commonsService.getTypeList().then(data => {
                //this.listTypes = data
                //this.listTypes.push();
                this.listTypes = [new Type({id: null, description: '--- Aucun ---'})].concat(data);
            });            

            this.commonsService.getAllItems(page).then(response => {
                this.items = response;
                                
                console.log(response);
                this.loading--;
                this.orderField = this.commonsService.orderField;
                this.orderDirection = this.commonsService.orderDirection;
            });

        });
    }

    changeOrder(order: string) {
        if (order == this.commonsService.orderField) {
            this.commonsService.orderDirection = (this.commonsService.orderDirection == "DESC") ? 'ASC' : 'DESC';
        } else {
            this.commonsService.orderField = order;
            this.commonsService.orderDirection = 'ASC';
        }

        let orderString = this.commonsService.orderField;
        if (this.commonsService.orderDirection !== 'ASC') {
            orderString += ' DESC';
        }

        let page: number = 0;
        if (this.items.pagination.currentPage !== undefined) {
            page = this.items.pagination.currentPage;
        }

        this.commonsService.recallUrl(page, orderString).then(items => {
            this.items = items;
            this.loading--;
            this.orderField = this.commonsService.orderField;
            this.orderDirection = this.commonsService.orderDirection;
        })
            .catch(error => {
                this.errors.setErrors(error._body);
                this.loading--;
            });
    }

    pageChange(event: any) {

        if (this.items.pagination.currentPage !== undefined && event !== this.items.pagination.currentPage) {
            let orderString = this.commonsService.orderField;
            if (this.commonsService.orderDirection !== 'ASC') {
                orderString += ' DESC';
            }

            this.loading++;
            this.commonsService.recallUrl(event, orderString).then(items => {
                this.items = items;
                this.loading--;
                this.orderField = this.commonsService.orderField;
                this.orderDirection = this.commonsService.orderDirection;
            }).catch(error => {
                this.errors.setErrors(error._body);
                this.loading--;
            });
        }
    }
    
    updateItem(item: Lists) {
        this.commonsService.updateItem(item).then(() => this.router.navigate([`/lists${this.appUrl}`]));;
    }
    
    deleteItem(item: Lists) {
        this.commonsService.deleteItem(item).then(() => this.router.navigate([`/lists/${this.appUrl}`]));;
    }


}
