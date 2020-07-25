# BOOKKEEPER

## Changes in single JS

1. Add to html head

```
%meta{ name: "parameters", content: "#{{ route: "#{params[:controller]}/#{params[:action]}", payload: (@payload || {})}.to_json}" }
```

2. Have a single application.js to be compiled by webpacker

Have a `hooks` variable to serve as hash with key representing route and value as an array of js components to load.

```
const hooks = {
  "controller/action": [Component]
};
```

Single on load listener with pure js.

```
document.addEventListener("DOMContentLoaded", () => {
  const { route, payload }  = JSON.parse($("meta[name='parameters']").attr('content'));
  const authenticityToken   = $("meta[name='csrf-token']").attr('content');
  const options             = { authenticityToken, ...payload };

  const components  = hooks[route];

  if(components) {
    components.forEach((component) => {
      component.init(options);
    });
  }
});
```
