import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailComponent } from './components/detail/detail.component';
import { RandomizerComponent } from './components/randomizer/randomizer.component';
import { NewStudentComponent } from './components/new-student/new-student.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'detail/:id', component: DetailComponent},
    {path: 'randomizer', component: RandomizerComponent},
    {path: 'newStudent', component: NewStudentComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'}, //quando hai un path ed essere sicuro che TUTTO sia ''
    {path: '**', loadComponent: () => import("./components/not-found/not-found.component") //import dinamico
                                            .then(ts => ts.NotFoundComponent)}
];
