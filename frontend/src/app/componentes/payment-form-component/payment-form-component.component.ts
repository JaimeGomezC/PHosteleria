import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, NgZone, OnChanges, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StripeService } from 'src/app/servicios/stripe.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form-component.component.html',
  styleUrls: ['./payment-form-component.component.css']
})
export class PaymentFormComponent implements AfterViewInit {

  @ViewChild('cardInfo') cardInfo!: ElementRef;
  cardError: any;
  card: any;

  submitted = false;
  form!: FormGroup;
  loading = false;
  formData = new FormData();

  @Input() dataFromParent: any;
  @Output() dataToParent = new EventEmitter<any>();


  constructor(
    private ngZone: NgZone,
    public formBuilder: FormBuilder,
    private stripeService: StripeService,
    private snack: MatSnackBar
    ){
      this.form = new FormGroup({
        precio: new FormControl()
      });
      
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(this.dataFromParent)
    if (changes['dataFromParent'] && changes['dataFromParent'].currentValue) {
      this.form.value.precio = changes['dataFromParent'].currentValue.importe;
      this.form.patchValue({
        precio: changes['dataFromParent'].currentValue.importe
        
      });
    }
  }
  ngAfterViewInit(){
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.onChange.bind(this));
  }

  onChange({ error }: { error: any}){
    if (error){
      this.ngZone.run(() => this.cardError = error.message);
      
    }
    else{
      this.ngZone.run(() => this.cardError = null);
    }
  }

  async onCLick(precio: number){
    const { token, error} = await stripe.createToken(this.card);
    if (token){
      const response = await this.stripeService.charge(precio * 100 , token.id);
      this.sendDataToParent(response)
    }
    else{
      this.ngZone.run(() => this.cardError = error.message);
      this.sendDataToParent(error)
    }
  }

  onSubmit(): void {
    this.submitted = true;
    this.loading = true;
    //this.precio = this.form.value.precio;
    this.onCLick(this.form.value.precio);

  }

  sendDataToParent(data:any) {
    this.dataToParent.emit(data);
  }

}
