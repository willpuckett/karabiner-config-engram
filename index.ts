import { parse } from "$std/flags/mod.ts";
import { simlayers } from "./simlayers.ts"  
import { combos } from "./combos.ts"


const flags = parse(Deno.args, {
  boolean: ["help", "full"],
});
flags.help && console.log('run with --full to generate layout that allows all combos of home row mods,\notherwise generates simlayers that allow only one mod at a time.\nSimlayers are the default and feel slightly smoother to type on.\nNote that regular modifiers can still be used with simlayers.\n') 
flags.help && Deno.exit(0);
flags.full ? combos() : simlayers();
