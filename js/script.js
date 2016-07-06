angular.module('calcApp', []).controller('CalcController', function(){
	var calc = this;
  var coefCounter = 1;
	calc.todos = [{id:0, coef:"0"}];
  calc.table = [];
  calc.isStable = "";

	calc.addTerm = function() {
      calc.todos.push({id:coefCounter, coef:"0"});
      calc.text2 = '';
      coefCounter++;
    };

  calc.removeTerm = function() {
      calc.todos.pop();
      coefCounter--;
  }

  calc.generateTable = function() {
    var coef = [];
    var line = [];
    var i = 0;
    
     angular.forEach(calc.todos, function(todo) {
        if (todo.coef != ''){
          coef[i] = parseInt(todo.coef);
        }else{
          coef[i] = 0;
        }
        i++;
     });
    var max = i;

    for(i = 0; i < coef.length; i++){
      line[i] = new Array();
    }

    // Generate first two table lines
    for(ln = 0; ln < 2; ln++){
      for(i = max; i > 0; i -= 2){
        line[ln].push(coef[i-1]);
        console.log("ln:", ln, "i:", i, "coef[i-1]:", coef[i-1]);
      }
      line[ln].push(0);
      max--;
    }

    // Calculate the remainder table cells
    for(ax = ln; ax < coef.length; ax++){
      pos = 0;
      while(pos+1 < line[ax-2].length-1){
        if(pos+1 >= line[ax-1].length){
          var param = 0;
        }else{
          param = line[ax-1][pos+1];
        }
        if(line[ax-1][0] != 0){
          line[ax].push(((line[ax-1][0] * line[ax-2][pos+1])-(line[ax-2][0]*param))/line[ax-1][0]);
        }else{
          line[ax].push(0);
        }
        pos++;
      }
      line[ax].push(0);
    }
    calc.table = line;
    calc.isStable = "Sistema Assintoticamente Estavel";
    for(i = 0; i < line.length; i++){
      if(line[i][0] < 0){
        calc.isStable = "Sistema Nao Estavel";
      }
    }
    
  };


})
