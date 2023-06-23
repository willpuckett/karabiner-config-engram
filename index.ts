import {
  FromKeyParam,
  ifVar,
  layer,
  LayerKeyParam,
  map,
  ModifierParam,
  rule,
  simlayer,
  ToKeyParam,
  withMapper,
  withModifier,
  writeToProfile,
} from 'karabinerts'
import { engram, engram_left, engram_right } from './engram.ts'


const qhr: FromKeyParam[] = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';']
const mods = ['⌃', '⌥', '⌘', '⇧']

const combinations = (array: string[]) => array.flatMap(
    (v, i) => array.slice(i+1).map( w => v  + w )
);
const conc = (j: ModifierParam, k: ModifierParam | undefined) =>
  k ? `${j as string}${k as string}` as ModifierParam : j

// writeToProfile("--dry-run",
writeToProfile('karabiner.ts', [
  layer('⇪', 'nav').manipulators([
    withModifier('optionalAny')([
      withMapper({
        'u': '↖︎',
        'i': '⇟',
        'o': '⇞',
        'p': '↘︎',
        'j': '←',
        'k': '↓',
        'l': '↑',
        ';': '→',
      })((k, v) => map(k).to(v as ToKeyParam)),
      withMapper({ 'm': 'z', ',': 'x', '.': 'c', '/': 'v' })((k, v) =>
        map(k).to(v as ToKeyParam, '<⌘')
        ),
      ]),
    ]),
// simlayer('d', 'combi1').condition(ifVar('⇧', 1)).manipulators([
//   withMapper(engram_right)((k) =>
//         map(k.from, k.fromMod).to(
//           k.to,
//           conc('⌘⇧' as ModifierParam, k.toMod),
//         )
//       ),
// ]),

  ...(qhr.map((key, i) =>
  simlayer(key as LayerKeyParam, i < 4 ? '<' : '>' + mods[i < 4 ? i : 7 - i]).manipulators([
      withMapper(i < 4 ? engram_right : engram_left)((k) =>
        map(k.from, k.fromMod).to(
          k.to,
          conc(mods[i < 4 ? i : 7 - i ] as ModifierParam, k.toMod),
        )
      ),
    ])
  )),

  rule('short pinkies').manipulators([
    withModifier('optionalAny')([
      map('<⌘').toIfAlone('⌫').to('<⌘'),
      map('>⌘').toIfAlone('⏎').to('<⌘'),
      map('=').to('⌫'),
      map('>⇧', '<⇧').to('\\'),
      map('>⇧').to('/'),
    ]),
  ]),
  rule('engram').manipulators([
    withModifier('optionalAny')([
      withMapper(engram)((k) => map(k.from, k.fromMod).to(k.to, k.toMod)),
    ]),
  ]),
], {
  'simlayer.threshold_milliseconds': 300,
  // 'basic.to_delayed_action_delay_milliseconds': 151,
  // 'basic.to_if_alone_timeout_milliseconds': 150,
  // 'basic.to_if_held_down_threshold_milliseconds': 151,
})
