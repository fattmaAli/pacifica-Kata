import {CalculTtcDirective} from "./calcul-ttc.directive";
import {TestBed} from '@angular/core/testing';
import {By} from "@angular/platform-browser";
import {Component} from "@angular/core";


describe('CalculTtcDirective', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  let fixture

beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [CalculTtcDirective, TestComponent],
  }).compileComponents();

  fixture = TestBed.createComponent(TestComponent);
  fixture.detectChanges();
});

it('ht price  "3.84" after tax  ttc price should be "4.04" ',() =>{
  let div = fixture.debugElement.query(By.css('div'))
  expect(div.nativeElement.outerText).toBe("4.04")
})
});
@Component({
  template: `
    <div [appCalculTtc]="{price:3.84,tax:5}"></div>`
})
class TestComponent {
}
