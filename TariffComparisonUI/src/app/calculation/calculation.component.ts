import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { TariffService } from '../service/tariff.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent implements OnInit,OnDestroy {

  tariffCalculatorFormGroup: FormGroup;

  consumption:Number = 0;
  tariffs:any = []
  private subscriptions: Subscription[] = [];
  

  constructor(private formBuilder: FormBuilder, private tariffService: TariffService,
    private cdr: ChangeDetectorRef) { 
    this.tariffCalculatorFormGroup = this.formBuilder.group({
      consumption: ['',Validators.compose([Validators.required, Validators.pattern(/^(?:[0-9]+(?:\.[0-9]{0,10})?)?$/)])]
    })
  }

  ngOnInit(): void {
  }

  calculateCost(){
    if(this.tariffCalculatorFormGroup.valid){
      const SBPost = this.tariffService.CalculateTariffa(this.tariffCalculatorFormGroup.value).subscribe((response)=>{
        this.tariffs = response;
        this.cdr.markForCheck();
      }, (error)=>{
        console.log("Failed to get the result");
      });
      this.subscriptions.push(SBPost);
    } else {
      console.log("Invalid Data");
    }

  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
