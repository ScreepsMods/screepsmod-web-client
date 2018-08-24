/* Copied from screeps renderer demo */
/**
 * Created by vedi on 07/04/2017.
 */

const resourceMap = {
    bodyPartBar: require('@screeps/renderer-metadata/images/bodyPartBar.svg'),
    // circle: require('@screeps/renderer-metadata/images/circle.svg'),
    constructedWall: require('@screeps/renderer-metadata/images/constructedWall.svg'),
    controller: require('@screeps/renderer-metadata/images/controller.svg'),
    'controller-level': require('@screeps/renderer-metadata/images/controller-level.svg'),
    cover: require('@screeps/renderer-metadata/images/cover.svg'),
    'creep-npc': require('@screeps/renderer-metadata/images/creep-npc.svg'),
    'creep-mask': require('@screeps/renderer-metadata/images/creep-mask.png'),
    flag: require('@screeps/renderer-metadata/images/flag.svg'),
    'flag-secondary': require('@screeps/renderer-metadata/images/flag-secondary.svg'),
    extension: require('@screeps/renderer-metadata/images/extension.svg'),
    'extension-border50': require('@screeps/renderer-metadata/images/extension-border50.svg'),
    'extension-border100': require('@screeps/renderer-metadata/images/extension-border100.svg'),
    'extension-border200': require('@screeps/renderer-metadata/images/extension-border200.svg'),
    extractor: require('@screeps/renderer-metadata/images/extractor.svg'),
    'exit-left': require('@screeps/renderer-metadata/images/exit-left.svg'),
    'exit-top': require('@screeps/renderer-metadata/images/exit-top.svg'),
    'exit-bottom': require('@screeps/renderer-metadata/images/exit-bottom.svg'),
    'exit-right': require('@screeps/renderer-metadata/images/exit-right.svg'),
    flare1: require('@screeps/renderer-metadata/images/flare1.png'),
    flare2: require('@screeps/renderer-metadata/images/flare2.png'),
    glow: require('@screeps/renderer-metadata/images/glow.png'),
    lab: require('@screeps/renderer-metadata/images/lab.svg'),
    'lab-highlight': require('@screeps/renderer-metadata/images/lab-highlight.svg'),
    'lab-mineral': require('@screeps/renderer-metadata/images/lab-mineral.svg'),
    link: require('@screeps/renderer-metadata/images/link.svg'),
    'link-energy': require('@screeps/renderer-metadata/images/link-energy.svg'),
    'link-border': require('@screeps/renderer-metadata/images/link-border.svg'),
    nuke: require('@screeps/renderer-metadata/images/nuke.svg'),
    nuker: require('@screeps/renderer-metadata/images/nuker.svg'),
    'nuker-border': require('@screeps/renderer-metadata/images/nuker-border.svg'),
    powerBank: require('@screeps/renderer-metadata/images/powerBank.svg'),
    rectangle: require('@screeps/renderer-metadata/images/rectangle.svg'),
    rampart: require('@screeps/renderer-metadata/images/rampart.svg'),
    storage: require('@screeps/renderer-metadata/images/storage.svg'),
    'storage-border': require('@screeps/renderer-metadata/images/storage-border.svg'),
    tbd: require('@screeps/renderer-metadata/images/tbd.svg'),
    terminal: require('@screeps/renderer-metadata/images/terminal.svg'),
    'terminal-border': require('@screeps/renderer-metadata/images/terminal-border.svg'),
    'terminal-highlight': require('@screeps/renderer-metadata/images/terminal-highlight.svg'),
    'terminal-arrows': require('@screeps/renderer-metadata/images/terminal-arrows.svg'),
    'tombstone-border': require('@screeps/renderer-metadata/images/tombstone-border.svg'),
    'tombstone-resource': require('@screeps/renderer-metadata/images/tombstone-resource.svg'),
    tough: require('@screeps/renderer-metadata/images/tough.svg'),
    'tower-base': require('@screeps/renderer-metadata/images/tower-base.svg'),
    'tower-rotatable': require('@screeps/renderer-metadata/images/tower-rotatable.svg'),
    ground: require('@screeps/renderer-metadata/images/ground.png'),
    'ground-mask': require('@screeps/renderer-metadata/images/ground-mask.png'),
    // 'ground-mask2': require('@screeps/renderer-metadata/images/ground-mask2.png'),
    noise1: require('@screeps/renderer-metadata/images/noise1.png'),
    noise2: require('@screeps/renderer-metadata/images/noise2.png'),
};

const rescaleResources = [
    'creep-npc',
    'flag',
    'flag-secondary',
    'powerBank',
    'extractor',
    'controller',
    'controller-level',
    'constructedWall',
    'nuker',
    'nuker-border',
    'link',
    'link-border',
    'extension-border50',
    'extension-border100',
    'extension-border200',
    'lab',
    'terminal-border',
    'terminal-arrows',
    'bodyPartBar',
    'tower-base',
    'storage',
    'storage-border',
    'tombstone-border',
    'tombstone-resource'
];

export { resourceMap, rescaleResources };