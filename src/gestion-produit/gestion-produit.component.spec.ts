import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GestionProduitComponent } from './gestion-produit.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        GestionProduitComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(GestionProduitComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Panier'`, () => {
    const fixture = TestBed.createComponent(GestionProduitComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Panier');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(GestionProduitComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('Panier app is running!');
  });
});
