// Listen on port 9001
var PORT = 9001
var HOOK_SCRIPT = './hook.sh'
var gith = require('gith').create( PORT );
// Import execFile, to run our bash script
var execFile = require('child_process').exec;

console.log("Stated listening for webhooks on port "+PORT);
gith({
    repo: 'ProjectGreenZone/project-green-zone-nodejs-server'
}).on( 'all', function( payload ) {
    if( payload.branch === 'master' )
    {
            // Exec a shell script
            console.log("Running " + HOOK_SCRIPT);
            execFile(HOOK_SCRIPT, function(error, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                }
            });
    }
});