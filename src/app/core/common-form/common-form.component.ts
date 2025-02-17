import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ScrollService } from '../../shared/services/scroll.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { NavigateService } from '../../shared/services/navigate.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RippleButtonComponent } from '../../shared/components/ripple-button.component';
import { AnimatedCardComponent } from '../../shared/components/animated-card.component';
import { ScrollAnimationDirective } from '../../shared/animations/scroll-animation.directive';

@Component({
  selector: 'app-common-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScrollAnimationDirective,
    RippleButtonComponent,
    AnimatedCardComponent,
  ],
  templateUrl: './common-form.component.html',
  styleUrl: './common-form.component.scss',
})
export class CommonFormComponent implements AfterViewInit, OnDestroy {
  private scrollSubscription!: Subscription;
  @Output() navigateToEvent = new EventEmitter<string>();

  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;

  constructor(
    private scrollService: ScrollService,
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router,
    private navigateService: NavigateService,
    private fb: FormBuilder
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  async onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      this.submitSuccess = true;
      this.contactForm.reset();
      this.isSubmitting = false;

      // Reset success message after 5 seconds
      setTimeout(() => {
        this.submitSuccess = false;
      }, 5000);
    } else {
      Object.keys(this.contactForm.controls).forEach((key) => {
        const control = this.contactForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // ✅ Ensure execution happens only in the browser
      this.scrollSubscription = this.scrollService.scrollToSection$.subscribe(
        (sectionId) => {
          this.navigateToHomeComponent(sectionId);
          console.log(sectionId);
        }
      );
    }
  }

  navigateToHomeComponent(sectionId: string) {
    if (sectionId === 'home') {
      this.router.navigate(['/home', sectionId]);
    } else if (sectionId === 'about') {
      this.router.navigate(['/about', sectionId]);
    } else if (sectionId === 'services') {
      this.router.navigate(['/services', sectionId]);
    } else if (sectionId === 'industries') {
      this.router.navigate(['/industries', sectionId]);
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }
}
