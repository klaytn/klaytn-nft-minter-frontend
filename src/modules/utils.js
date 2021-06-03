export function createDefaultReducer(routines) {
  var reducers = {};
  routines.map(x=> {
    if(x.reducer !== false) {
      reducers = Object.assign(reducers, {
        [x.routine.SUCCESS]: (state, action) => {
          return {...state, [x.routine.SUCCESS]:action.payload};
        },
        [x.routine.FAILURE]: (state, action) => {
          return {...state, [x.routine.FAILURE]:action.payload};
        },
        [x.routine.FULFILL]: (state, action) => {
          return {...state, [x.routine.FULFILL]:action.payload};
        }
      });
    }
  })
  return reducers;
}

export const isMobile = {
  Android: function () {
           return navigator.userAgent.match(/Android/i) == null ? false : true;
  },
  BlackBerry: function () {
           return navigator.userAgent.match(/BlackBerry/i) == null ? false : true;
  },
  IOS: function () {
           return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
  },
  Opera: function () {
           return navigator.userAgent.match(/Opera Mini/i) == null ? false : true;
  },
  Windows: function () {
           return navigator.userAgent.match(/IEMobile/i) == null ? false : true;
  },
  any: function () {
           return (isMobile.Android() || isMobile.BlackBerry() || isMobile.IOS() || isMobile.Opera() || isMobile.Windows());
  }
};