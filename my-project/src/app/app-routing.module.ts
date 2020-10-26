import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { RoutesLinksComponent } from './components/routes-links/routes-links.component'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProductsComponent } from './components/products/products.component';
import { AuthGuard } from './auth.guard';
import { OrdersComponent } from './components/orders/orders.component';
import { HomeComponent } from './components/home/home.component';




interface CustomRoute extends Route {
  children?: Array<CustomRoute>;
  title?: string
}

export const routes: Array<CustomRoute> = [
  { path: "login", title: 'login', component: LoginComponent },
  { path: "registration", title: 'registration', component: RegistrationComponent },
  { path: "", title: '/',  component: HomeComponent },
  { path: "products", title: 'products',  component: ProductsComponent, canActivate: [AuthGuard] },
  { path: "orders", title: 'orders', component: OrdersComponent, canActivate: [AuthGuard] }]

@NgModule({
  declarations: [RoutesLinksComponent],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule, RoutesLinksComponent]
})
export class AppRoutingModule { }
