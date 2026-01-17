import { InfoTileTypes } from '@/components/tiles/InfoTile/IInfoTile';
import { getText } from "@/services/localization";

export default function useInfoTileData(type: InfoTileTypes) {
   return {
     value: 2000,
     colors: ['#dcdcdcff', '#ffffffff', '#ffffffff'],
     title: getText("expences"),
   };
}
