
(function(){
  var cache = {}, r = "replace", s="split", j="join";

  this.tmpl = function tmpl(str, data){
    // Do we need to load the template, or are we just getting one?
    // Whichever it is, let's just cache the results...
    var fxn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :

      // Create function which will be cached to act as the template
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +

        // Data is introduced as local variables using with(){}... 
        "with(obj){p.push('" +

        // Template now gets converted to vanilla JavaScript
        str[r](/[\r\t\n]/g, " ")[s]("<@").join("\t")[r](/((^|@>)[^\t]*)'/g, "$1\r")[r](/\t=(.*?)@>/g, "',$1,'")[s]("\t")[j]("');")[s]("@>")[j]("p.push('")[s]("\r")[j]("\\'")+ "');}return p.join('');");

    return data ? fxn( data ) : fxn;
  };
})();
