# Engram Config for Karabiner

Engram layout for Karabiner.

```ts
[{  1|  2=  3~  4+   5<   6>   7^  8&  9%  0*  ]}  
    bB  yY  oO  uU   '(   ")   lL  dD  wW  vV  zZ  #$  @`
   ⌃cC ⌥iI ⌘eE ⇧aA   ,;   .:  ⇧hH ⌘tT ⌥sS ⌃nN  qQ  
    gG  xX  jJ  kK   -_   ?!   rR  mM  fF  pP  /\
         ⌫              ␣           ⏎
```

Engrammer layout for Karabiner

```ts
 `~ 1! 2@ 3# 4$  5%  6^  7& 8* 9( 0) [{ ]}
    bB yY oO uU  '"  ;:  lL dD wW vV zZ =+ \|
    cC iI eE aA  ,<  .>  hH tT sS nN qQ
    gG xX jJ kK  -_  /?  rR mM fF pP
         ⌫              ␣           ⏎
```

When this repo began, I was using the vanilla Engram layout. As I progressed, I realized that typing JavaScript in particular was very uncomfortable. Reaching up to the angle brackets (<>) was very uncomfortable. I was also not enjoying having parethesis on the center column, despite it seeming nice when I thought about it--I couldn't get a roll out of them and I often type them together for arrow functions. () => {}

While there are always compromises, I ultimately found the Engrammer variant to be much more natural for punctuation. It also had the benefits of the symbols being of the right keys on my laptop keyboard, and being simpler to configure in Karabiner. 

Project includes [Karabiner.ts](https://github.com/evan-liu/karabiner.ts)
config, as well as a [Goku](https://github.com/yqrashawn/GokuRakuJoudo) config.

Home Row Mods are working better in the Karabiner.ts config than the Goku one.
(They're configured as simlayers in the Karabiner.ts version.) Karabiner.ts also
🏃🏻‍♂️s 53 times faster--73.6ms vs. 3.947s.

The command keys are set to work more like they do on a mech ergo board.

Currently, Home Row Mods work only one at a time, but hoping to get that sorted
shortly. 🤓

Karabiner still has some shortcomings. It seems like no matter how it's
configured, typing rhythm isn't as natural with Karabiner as it is with
[timeless Home Row Mods](https://github.com/urob/zmk-config#timeless-homerow-mods)
in zmk using below config.

```dtsi
hrml: home_row_mod_left {
    compatible = "zmk,behavior-hold-tap";
    label = "HOME_ROW_MOD_LEFT";
    #binding-cells = <2>;
    flavor = "balanced";
    tapping-term-ms = <HM_TAPPING_TERM>;
    hold-trigger-key-positions = < KEYS_R THUMBS >;
    hold-trigger-on-release;
    bindings = <&kp>, <&kp>;
    };
```

## Installing

### Karabiner.ts

1. Clone this repo.
2. Create a profile in Karabiner called 'karabiner.ts'.
3. Run `deno task sim` in the repo directory to use the Engram layout (Engrammer punctuation placement) with simlayers. This allows only one home row mod to be used at once, though they may still be paired with traditional mods. Run `deno task full` to create a layout that allows full combinations of all home row meds.

### Goku

1. Clone this repository.
2. Create a profile in Karabiner called 'goku'.
3. Install Goku `brew install yqrashawn/goku/goku`.
4. From the repo directory, copy the config file to your `.config` directory
   `cp karabiner.edn ~/.config`.
5. Run Goku `goku`
