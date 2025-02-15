import { Component, HostListener } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
  ReactiveFormsModule,
  AsyncValidatorFn,
} from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { MessageModule } from 'primeng/message';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Observable, catchError, debounceTime, of, switchMap } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-comment',
  imports: [
    ReactiveFormsModule,
    TextareaModule,
    MessageModule,
    RatingModule,
    ButtonModule,
    FloatLabelModule,
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  protected forbiddenWords = ['scemo', 'stupido'];
  protected characterCount: number = 0;
  protected showSubmitMessage: boolean = false;

  protected commentFormGroup = new FormGroup({
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(200),
      forbiddenWordsValidator(
        new RegExp('^(?!.*\\b(' + this.forbiddenWords.join('|') + ')\\b).*')
      ),
    ]),
    rating: new FormControl(0, [
      Validators.max(5),
      Validators.min(1),
      Validators.required,
    ]),
  });

  // Host listener for input event
  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.characterCount = textarea.value.length;
    this.commentFormGroup.updateValueAndValidity();
  }

  constructor(private apiService: ApiService) {
    // Add async validator function to async validator
    this.commentFormGroup
      .get('description')
      ?.addAsyncValidators(
        forbiddenWordsValidatorAsyncValidator(this.apiService)
      );
  }

  /**
   * Getter method for description
   *
   * @returns {Partial<AbstractControl>|null} - description controller
   */
  get description(): Partial<AbstractControl> | null {
    return this.commentFormGroup.get('description');
  }

  /**
   * Submit event
   *
   * @returns {void}
   */
  onSubmit() {
    this.commentFormGroup.clearAsyncValidators();
    this.commentFormGroup.clearValidators();
    this.showSubmitMessage = true;

    //Submit to API service
    this.apiService.postComment(this.commentFormGroup);

    setInterval(() => {
      this.showSubmitMessage = false;
      window.location.reload();
    }, 3000);
  }
}

/**
 * Forbidden words sync validator function
 *
 * @param {RegExp} nameRe - regex
 * @returns {ValidatorFn}
 */
export function forbiddenWordsValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = !nameRe.test(control.value);
    return forbidden ? { forbiddenWords: { value: control.value } } : null;
  };
}

/**
 * Forbidden words async validator function
 *
 * @param {ApiService} apiService - API service
 *
 * @returns {Observable<ValidationErrors | null>}
 */
export function forbiddenWordsValidatorAsyncValidator(
  apiService: ApiService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value || control.value.trim() === '') {
      return of(null);
    }

    return apiService.getBadWords().pipe(
      debounceTime(300),
      switchMap((res) => {
        const containsBadWords = res.badWords.some((word) =>
          control.value.toLowerCase().includes(word.toLowerCase())
        );
        return of(containsBadWords ? { forbiddenWords: true } : null);
      }),
      catchError(() => of(null))
    );
  };
}
