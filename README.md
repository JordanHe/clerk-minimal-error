## Setup

Add in the clerk publishable key in apps/expo/app/\_layout.tsx line 27
Add in a clerk publishable key in apps/nextjs/src/pages/\_app.tsx line 23

then to run expo go to see the error:
go into expo folder and run
expo start -c
then scan it with the expo go app and you should see this error:

Android Bundling failed 4038ms
Unable to resolve module #components from /Users/jordan.hesse/Documents/self Learning/INTVL2/minimal/node_modules/@clerk/nextjs/dist/cjs/index.js: #components could not be found within the project or in these directories:
node_modules
../../node_modules
91 | var import_uiComponents = require("./client-boundary/uiComponents");
92 | var import_hooks = require("./client-boundary/hooks");

> 93 | var ComponentsModule = \_\_toESM(require("#components"));

     |                                         ^

94 | var ServerHelperModule = \_\_toESM(require("#server"));
95 | const ClerkProvider = ComponentsModule.ClerkProvider;
96 | const SignedIn = ComponentsModule.SignedIn;
