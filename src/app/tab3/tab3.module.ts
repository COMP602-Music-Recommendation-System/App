import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";
import { Tab3PageRoutingModule } from "./tab3-routing.module";
import { Tab3Page } from "./tab3.page";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab3PageRoutingModule,
  ],
  declarations: [Tab3Page],
})
export class Tab3PageModule {}
