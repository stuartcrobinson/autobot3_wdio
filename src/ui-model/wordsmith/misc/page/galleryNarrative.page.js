// @ts-check
import { WordsmithPage } from '../../WordsmithPage';

export class GalleryNarrative extends WordsmithPage {
  constructor(galleryUrlName) {
    super(`/gallery/${galleryUrlName}`);
    this.getProjectButton = this.get('.page-heading--gallery-story .mdl-button__ripple-container').tagAsLoadCriterion();
    super.nameElements();
  }
}

export const galleryCityGuideNarrative = new GalleryNarrative('city-guide');
