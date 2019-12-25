import { configure, addParameters } from "@storybook/svelte";

addParameters({backgrounds:[{name: 'pankod-bg', value:'#2c3e50', default:true}]});

configure(require.context('../src', true, /\.stories\.js$/), module);
