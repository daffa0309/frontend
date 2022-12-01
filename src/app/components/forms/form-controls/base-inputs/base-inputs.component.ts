import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import {Subscription} from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { MenuApiServices } from 'src/app/services/Api/menu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Menu } from 'src/app/models/Menu';
import { MenuDataService } from 'src/app/services/Data/menu.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-base-inputs',
  templateUrl: './base-inputs.component.html',
  styleUrls: ['./base-inputs.component.scss']
})
export class BaseInputsComponent implements OnInit {
  public menu: Menu[];
  public formGroup: FormGroup;
  private subscriptions: Subscription[] = [];


  options$: Observable<number[]>;
  constructor(
    private menuDataService: MenuDataService,
    private cdr: ChangeDetectorRef,
    private formBuild: FormBuilder,
    private router: Router,
    ) {
    this.options$=of([1,2,3,4,5,6]);
   }

   private initForm() {
    this.formGroup = this.formBuild.group({
      header: [null],
      menuName: [null, [Validators.required]],
      menu: [null],
    });

    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.initForm();
    this.menuDataService.getAll().subscribe((data) => {
      this.menu = data;
      console.log(this.menu);
      
    });
  }
  public save() {
    const dataForm = this.formGroup.value;
    const data = {
      visible: dataForm.header == true ? 1 : 0,
      name: dataForm.menuName,
      url: dataForm.menu,
}
    this.create(data);
    
  }
  private create(data: { [key: string]: any }){
    const sbCreate = this.menuDataService
    .create(data)
    .pipe(
      finalize(() => {
        this.formGroup.reset();
        this.router.navigate(['/dashboard/default']);

      })
    )
    .subscribe(
      
    );
  this.subscriptions.push(sbCreate);
  }

}



