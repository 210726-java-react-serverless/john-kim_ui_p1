import env from '../util/env.js'

export function ViewComponent(viewName) {

    let templateHolder = '';
    let frag = `components/${viewName}/${viewName}.component`;
    
    // This is a JSON which holds metadata.
    this.viewMetadata = {

        name:viewName,
        url: `/${viewName}`,
        templateUri: `${frag}.html`,
        stylesheetUri: `${frag}.css`

    };

    // This is the function which injects a template from a found, valid path into the main div.
    this.injectTemplate = function(cb) {
        if(templateHolder) {
            env.rootDiv.innerHTML = templateHolder;
            cb();
        } else {
            fetch(this.viewMetadata.templateUri)
                .then(resp => resp.text())
                .then(html => {
                    templateHolder = html;
                    env.rootDiv.innerHTML = templateHolder;
                    cb();
                })
                .catch(err => console.log(err));
        }
    }

    this.injectStyleSheet = function() {
        let styleSheet = document.getElementById('dynamic-css');
        if(styleSheet) styleSheet.remove();
        styleSheet = document.createElement('link');
        styleSheet.id = 'dynamic-css'
        styleSheet.rel = 'stylesheet';
        styleSheet.href = this.viewMetadata.stylesheetUri;
        document.head.appendChild(styleSheet);
    }
}