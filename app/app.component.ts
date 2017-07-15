import {Component} from "@angular/core";
import {Response} from "@angular/http";
import {GridOptions, IDatasource, IGetRowsParams} from "ag-grid";
import {DataService} from "./data.service";

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    providers: [DataService],
    styles: [
        '.hidden { display: none !important; }'
    ]
})
export class AppComponent {
    columnDefs = [
        {headerName: "Country", field: "country"},
        {headerName: "Continent", field: "continent"},
        {headerName: "Language", field: "language"}
    ];
    gridOptions: GridOptions = {
        rowModelType: 'infinite',
        processRowPostCreate: (d) => {
            if (!d.node.data) {
                d.eRow.classList.add('hidden');
                debugger;
            }
        }
    };

    constructor(private dataService: DataService) {}

    onGridReady() {
        let self = this;
        let dataSource: IDatasource = {
            getRows(params: IGetRowsParams) {
                self.dataService.getGridData({
                    start: params.startRow,
                    end: params.endRow
                }).subscribe(
                    (data: Response) => {
                        let { items, last } = data.json();

                        params.successCallback(items, last);
                    }
                );
            }
        };

        if (this.gridOptions.api) {
            this.gridOptions.api.setDatasource(dataSource);
        }
    }
}