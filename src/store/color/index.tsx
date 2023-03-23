import {observable, makeObservable} from 'mobx';

class color {
  constructor() {
    makeObservable(this);
  }

  //Two Color Combination Theme (available)
  //Background(1st Color)+Button1(2nd Color)
  //White+Orange --->                           theme:"white",statusBarText:"dark"
  //Black+Blue   --->                           theme:"black",statusBarText:"light"
  //Brown+Orange --->                           theme:"brown",statusBarText:"light"

  //white theme
  @observable theme = 'white';
  @observable statusBarText = 'dark-content';

  //Brown theme
  // @observable theme = 'brown';
  // @observable statusBarText = 'light-content';

  //Black theme
  // @observable theme = 'black';
  // @observable statusBarText = 'light-content';
}
export const Color = new color();
