import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { TabsPageRoutingModule } from "./tabs-routing.module";
import { TabsPage } from "./tabs.page";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, TabsPageRoutingModule],
  declarations: [TabsPage],
})
export class TabsPageModule {}
