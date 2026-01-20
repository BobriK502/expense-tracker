import React from 'react';

import Icon_aim from '@/assets/images/icons/aim.svg';
import Icon_american_heel from '@/assets/images/icons/american_heel.svg';
import Icon_bag from '@/assets/images/icons/bag.svg';
import Icon_ball from '@/assets/images/icons/ball.svg';
import Icon_bank from '@/assets/images/icons/bank.svg';
import Icon_bank_two from '@/assets/images/icons/bank_two.svg';
import Icon_bath from '@/assets/images/icons/bath.svg';
import Icon_bubletea from '@/assets/images/icons/bubletea.svg';
import Icon_build from '@/assets/images/icons/build.svg';
import Icon_cake from '@/assets/images/icons/cake.svg';
import Icon_cap from '@/assets/images/icons/cap.svg';
import Icon_car from '@/assets/images/icons/car.svg';
import Icon_card from '@/assets/images/icons/card.svg';
import Icon_cart from '@/assets/images/icons/cart.svg';
import Icon_charity from '@/assets/images/icons/charity.svg';
import Icon_cofee from '@/assets/images/icons/cofee.svg';
import Icon_cofeebean from '@/assets/images/icons/cofeebean.svg';
import Icon_coinbag from '@/assets/images/icons/coinbag.svg';
import Icon_eat_five from '@/assets/images/icons/eat_five.svg';
import Icon_eat_four from '@/assets/images/icons/eat_four.svg';
import Icon_eat_six from '@/assets/images/icons/eat_six.svg';
import Icon_eat_three from '@/assets/images/icons/eat_three.svg';
import Icon_eat_two from '@/assets/images/icons/eat_two.svg';
import Icon_emergency from '@/assets/images/icons/emergency.svg';
import Icon_exchange from '@/assets/images/icons/exchange.svg';
import Icon_family from '@/assets/images/icons/family.svg';
import Icon_fishing from '@/assets/images/icons/fishing.svg';
import Icon_hc from '@/assets/images/icons/hc.svg';
import Icon_hc_three from '@/assets/images/icons/hc_three.svg';
import Icon_hc_two from '@/assets/images/icons/hc_two.svg';
import Icon_house from '@/assets/images/icons/house.svg';
import Icon_house_tree from '@/assets/images/icons/house_tree.svg';
import Icon_mail from '@/assets/images/icons/mail.svg';
import Icon_map from '@/assets/images/icons/map.svg';
import Icon_money from '@/assets/images/icons/money.svg';
import Icon_money_flight from '@/assets/images/icons/money_flight.svg';
import Icon_mountain from '@/assets/images/icons/mountain.svg';
import Icon_mountain_two from '@/assets/images/icons/mountain_two.svg';
import Icon_pancake from '@/assets/images/icons/pancake.svg';
import Icon_plane from '@/assets/images/icons/plane.svg';
import Icon_plane_two from '@/assets/images/icons/plane_two.svg';
import Icon_question from '@/assets/images/icons/question.svg';
import Icon_ship from '@/assets/images/icons/ship.svg';
import Icon_ship_two from '@/assets/images/icons/ship_two.svg';
import Icon_soup from '@/assets/images/icons/soup.svg';
import Icon_supermarket from '@/assets/images/icons/supermarket.svg';
import Icon_toiletpaper from '@/assets/images/icons/toiletpaper.svg';
import Icon_tools from '@/assets/images/icons/tools.svg';
import Icon_tower from '@/assets/images/icons/tower.svg';
import Icon_transport from '@/assets/images/icons/transport.svg';
import Icon_transport_four from '@/assets/images/icons/transport_four.svg';
import Icon_transport_six from '@/assets/images/icons/transport_six.svg';
import Icon_transport_three from '@/assets/images/icons/transport_three.svg';
import Icon_transport_two from '@/assets/images/icons/transport_two.svg';
import Icon_tshirt from '@/assets/images/icons/tshirt.svg';
import Icon_tshirt_two from '@/assets/images/icons/tshirt_two.svg';
import Icon_vac from '@/assets/images/icons/vac.svg';
import Icon_water from '@/assets/images/icons/water.svg';
import Icon_wheel from '@/assets/images/icons/wheel.svg';
import Icon_work from '@/assets/images/icons/work.svg';



export const iconsMap: Record<
  string | 'default',
  ({ width, height }: { width: number; height: number }) => React.JSX.Element
> = {
  icon_aim: Icon_aim,
  icon_american_heel: Icon_american_heel,
  icon_bag: Icon_bag,
  icon_ball: Icon_ball,
  icon_bank: Icon_bank,
  icon_bank_two: Icon_bank_two,
  icon_bath: Icon_bath,
  icon_bubletea: Icon_bubletea,
  icon_build: Icon_build,
  icon_cake: Icon_cake,
  icon_cap: Icon_cap,
  icon_car: Icon_car,
  icon_card: Icon_card,
  icon_cart: Icon_cart,
  icon_charity: Icon_charity,
  icon_cofee: Icon_cofee,
  icon_cofeebean: Icon_cofeebean,
  icon_coinbag: Icon_coinbag,
  icon_eat_five: Icon_eat_five,
  icon_eat_four: Icon_eat_four,
  icon_eat_six: Icon_eat_six,
  icon_eat_three: Icon_eat_three,
  icon_eat_two: Icon_eat_two,
  icon_emergency: Icon_emergency,
  icon_exchange: Icon_exchange,
  icon_family: Icon_family,
  icon_fishing: Icon_fishing,
  icon_hc: Icon_hc,
  icon_hc_three: Icon_hc_three,
  icon_hc_two: Icon_hc_two,
  icon_house: Icon_house,
  icon_house_tree: Icon_house_tree,
  icon_mail: Icon_mail,
  icon_map: Icon_map,
  icon_money: Icon_money,
  icon_money_flight: Icon_money_flight,
  icon_mountain: Icon_mountain,
  icon_mountain_two: Icon_mountain_two,
  icon_pancake: Icon_pancake,
  icon_plane: Icon_plane,
  icon_plane_two: Icon_plane_two,
  icon_question: Icon_question,
  icon_ship: Icon_ship,
  icon_ship_two: Icon_ship_two,
  icon_soup: Icon_soup,
  icon_supermarket: Icon_supermarket,
  icon_toiletpaper: Icon_toiletpaper,
  icon_tools: Icon_tools,
  icon_tower: Icon_tower,
  icon_transport: Icon_transport,
  icon_transport_four: Icon_transport_four,
  icon_transport_six: Icon_transport_six,
  icon_transport_three: Icon_transport_three,
  icon_transport_two: Icon_transport_two,
  icon_tshirt: Icon_tshirt,
  icon_tshirt_two: Icon_tshirt_two,
  icon_vac: Icon_vac,
  icon_water: Icon_water,
  icon_wheel: Icon_wheel,
  icon_work: Icon_work,
  'default': Icon_question,
};

function MojiIcon({ width, height, iconId }) {
  const Icon = Object.keys(iconsMap).includes((iconId || "").toString()) ? iconsMap[iconId] : iconsMap.default;

  return <Icon width={width} height={height} />
}

export { MojiIcon };