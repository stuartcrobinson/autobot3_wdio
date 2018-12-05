// @ts-check
import { WordsmithPage } from '../../../../../aqua/support/WordsmithPage';

export const galleryCityGuideNarrative = new class GalleryNarrative extends WordsmithPage {
  constructor(galleryUrlName) {
    super(`/gallery/${galleryUrlName}`);
    this.getProjectButton = this.get('.page-heading--gallery-story .mdl-button__ripple-container').tagAsLoadCriterion();
    super.nameElements();
  }
}('city-guide');
