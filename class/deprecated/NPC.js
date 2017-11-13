/**
 * NPC
 */
(function () {
	var global = (1,eval)(this),
		NPC = function () {};

	var p = NPC.prototype = new global.Actor();

	p.entity = 'npc';

	global.NPC = NPC;
}());