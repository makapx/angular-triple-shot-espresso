import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Pipe to sanitize HTML content and mark it as safe for rendering in the DOM.
 * This is useful to avoid XSS attacks while rendering dynamic HTML content.
 */
@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  /**
   * Transforms a given HTML string to a sanitized, safe HTML.
   *
   * @param {string} value - The HTML content to sanitize.
   * @returns {SafeHtml} - The sanitized HTML content.
   */
  transform(value: string | undefined): SafeHtml {
    if (!value) return '';
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
