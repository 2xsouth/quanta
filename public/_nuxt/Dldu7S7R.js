import {d as element,e as open,f as h} from '#entry';
export default {
 name:'QuantaFooter',
 setup(){return()=>{open();return element('footer',{class:'quanta-footer padded max-width-mobile flex flex-wrap justify-between items-center text-sm font-suisse-regular py-30 ds:py-40'},[
  h('a',{href:'/',class:'quanta-footer-brand','aria-label':'quanta home'},[h('img',{src:'/complete.svg',alt:'quanta',width:250,height:75})]),
  h('p',{class:'quanta-copyright'},`© ${new Date().getFullYear()} quanta`),
  h('nav',{'aria-label':'footer',class:'quanta-footer-links'},[h('a',{href:'/about'},'about'),h('a',{href:'/contact'},'contact'),h('a',{href:'/legal'},'privacy & terms')]),
 ]);};},
};
