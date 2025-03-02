// ✅ Organized imports for better readability and maintainability
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// 🔄 Services
import { ScrollService } from '../../shared/services/scroll.service';
import { NavigateService } from '../../shared/services/navigate.service';
import { FormService } from '../../shared/services/form.service';

// 🔄 Form modules
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// 🔄 Components and Directives
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
  styleUrls: ['./common-form.component.scss'],
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
    private fb: FormBuilder // private formService: FormService, // Uncomment if needed
  ) {
    // ✅ Simplified form initialization
    this.contactForm = this.fb.group({
      clientName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.minLength(10)]],
      company: ['', [Validators.required, Validators.minLength(2)]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  // 🔄 Improved field validation check
  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return (field?.invalid && (field.dirty || field.touched)) || false;
  }

  // 🔄 Optimized submit handler
  async onSubmit() {
    if (this.contactForm.invalid || this.isSubmitting) {
      this.markAllFieldsTouched();
      return;
    }

    this.isSubmitting = true;

    // Define passkey and secret key
    const passkey = 'effinsorxe-v1-by-abhijeet-avee';
    const secret = 'superSecretKey'; // 🔒 Secret key shared only between client and server

    // Convert form data to URL-encoded string
    const formData = new URLSearchParams();
    formData.append('token', passkey); // 🔒 Pass API key as token
    Object.entries(this.contactForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    // 🔒 Generate HMAC signature and append to form data
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const passkeyData = encoder.encode(passkey);

    const signature = await crypto.subtle
      .importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, [
        'sign',
      ])
      .then((key) => crypto.subtle.sign('HMAC', key, passkeyData))
      .then((signatureBuffer) =>
        btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)))
      );

    console.log('Generated Signature:', signature); // 🐞 For debugging

    // 🔄 Append signature directly to form data
    formData.append('signature', signature);

    try {
      const apiUrl = `https://script.google.com/macros/s/AKfycbzwn6uhL4aLb1VQgVVA1dW1goq8vAx7aKZo9RT0aYsnC-upZVoI2s652afXkMeHnkFP/exec`;

      // Create the request without origin and signature headers
      const request = {
        method: 'POST',
        body: formData.toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      console.log('Request:', request); // 🐞 For debugging

      const response = await fetch(apiUrl, request);

      if (response.ok) {
        const result = await response.json();
        console.log('Response:', result);
        this.handleSuccess();
      } else {
        console.error(
          'Failed to submit the form:',
          response.status,
          response.statusText
        );
        throw new Error('Failed to submit the form');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      this.isSubmitting = false;
    }
  }

  // 🔄 Modularized success handling
  private handleSuccess() {
    this.submitSuccess = true;
    this.contactForm.reset();

    // ✅ Reset success message after 2.6 seconds
    setTimeout(() => (this.submitSuccess = false), 2600);
  }

  // 🔄 Modularized field marking
  private markAllFieldsTouched() {
    Object.keys(this.contactForm.controls).forEach((key) => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // ✅ Execute only in the browser
      this.scrollSubscription = this.scrollService.scrollToSection$.subscribe(
        (sectionId) => this.navigateToHomeComponent(sectionId)
      );
    }
  }

  // 🔄 Simplified navigation using a mapping object
  navigateToHomeComponent(sectionId: string) {
    const routes: Record<string, string> = {
      home: '/home',
      about: '/about',
      services: '/services',
      industries: '/industries',
    };
    this.router.navigate([routes[sectionId] || '/']);
  }

  ngOnDestroy(): void {
    this.scrollSubscription?.unsubscribe();
  }
}
