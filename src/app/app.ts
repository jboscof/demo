import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormGroup, FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, of, Subject, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  subscriptions = new Subscription
  form!:FormGroup
  searchInput$ = new Subject <string | null>();
  name = 'Juma'
  // const count = signal(0);

  protected readonly title = signal('demo');

  ngOnInit(){
    this.subscriptions.add(
      this.searchInput$.pipe(
        debounceTime(5000), 
        distinctUntilChanged()
      ).subscribe({
        next: value => {
          console.log(value)
        }
      })
    )

    const user = {
      name: 'juma',
      age: 34,
      role: 'admin'
    }
    console.log(Object.keys(user))
  }

  checkTyping(event:KeyboardEvent){
    console.log('Typing...', event.key)
  }

  search(value:string){
    let _value = value.trim()
    if(value !== ' '){
    this.searchInput$.next(_value)
    }
  }

  test(){
    of(1,2,3).pipe(
      tap(x => console.log('before', x)),
      map(x => x*10),
      tap(x => console.log('after', x))
    ).subscribe()
  }
}
