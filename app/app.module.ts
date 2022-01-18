
import './util/rxjs.extensions';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ContatosModule } from './contatos/contatos.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from "@angular/http";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from './in-memory-data.service';
import { DialogService } from './dialog.service';



@NgModule({
   imports: [
      AppRoutingModule,
      BrowserModule,
      ContatosModule,
      HttpModule,
      InMemoryWebApiModule.forRoot(InMemoryDataService),
      FormsModule
   ],
   declarations: [AppComponent],
   providers: [
      DialogService
   ],
   bootstrap: [AppComponent]
})
export class AppModule {}