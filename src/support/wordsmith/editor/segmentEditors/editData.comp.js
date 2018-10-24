// @ts-check
import { EditSegmentComp } from '../editSegment.comp';

/** Abstract */
export class EditDataComp extends EditSegmentComp {
  constructor() {
    super();
    if (this.constructor === EditDataComp) {
      throw new TypeError('Abstract class cannot be instantiated directly.');
    }
    // this.formatterCard = this.getChild('.card--datavar-formatter').tagAsLoadCriterion(); //not useful
    this.dataVarNameSpan = this.getChild('.segment__header-datavar').tagAsLoadCriterion();
    super.nameElements();
  }
};

