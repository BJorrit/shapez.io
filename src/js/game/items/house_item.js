import { globalConfig } from "../../core/config";
import { DrawParameters } from "../../core/draw_parameters";
import { Loader } from "../../core/loader";
import { types } from "../../savegame/serialization";
import { BaseItem } from "../base_item";
import { THEME } from "../theme";

export class HouseItem extends BaseItem {
    static getId() {
        return "house";
    }

    serialize() {
        return this.house;
    }

    deserialize(data) {
        this.house = data;
    }

    /** @returns {"house"} **/
    getItemType() {
        return "house";
    }

    /**
     * @returns {string}
     */
    getAsCopyableKey() {
        return this.house;
    }

    /**
     * @param {BaseItem} other
     */
    equalsImpl(other) {
        return this.house === /** @type {HouseItem} */ (other).house;
    }

    getBackgroundColorAsResource() {
        return THEME.map.resources[this.house];
    }

    /**
     * Draws the item to a canvas
     * @param {CanvasRenderingContext2D} context
     * @param {number} size
     */
    drawFullSizeOnCanvas(context, size) {
        if (!this.cachedSprite) {
            this.cachedSprite = Loader.getSprite("sprites/houses/" + this.house + ".png");
        }
        this.cachedSprite.drawCentered(context, size / 2, size / 2, size);
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} diameter
     * @param {DrawParameters} parameters
     */
    drawItemCenteredClipped(x, y, parameters, diameter = globalConfig.defaultItemDiameter) {
        const realDiameter = diameter * 0.6;
        if (!this.cachedSprite) {
            this.cachedSprite = Loader.getSprite("sprites/houses/" + this.house + ".png");
        }
        this.cachedSprite.drawCachedCentered(parameters, x, y, realDiameter);
    }
}
