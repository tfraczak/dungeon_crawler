// Available "you escaped the cave" backdrops. Asset files for each ID live
// at `src/assets/entities/ladder/end_of_game/<id>/{desktop,mobile}.png` and
// are preloaded at startup. The orientation variant is picked at climb time
// based on `gameState.isMobile` (mobile uses the wide 16:9 art; desktop uses
// the square art that matches the 720x720 canvas). The DEV_FLAGS `winScene`
// override can pin the picker to a specific ID for testing.
export default Object.freeze([
  "aurora_cliff",
  "autumn_forest",
  "jungle_waterfall",
  "lakeside_dawn",
]);
