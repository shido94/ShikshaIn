import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appFlexAlignment]'
})
export class FlexAlignmentDirective {
  @Input() set appFlexAlignment(count: number) {

    count = count || 20;

    this.viewContainerRef.clear();
    for (let i = 0; i < count; i++) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }

  }

  constructor(private templateRef: TemplateRef<any> , private viewContainerRef: ViewContainerRef) {
  }

}
