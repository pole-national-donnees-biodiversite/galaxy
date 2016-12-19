define(["mvc/workflow/workflow-view-node"],function(a){var b=Backbone.Model.extend({initialize:function(a,b){this.app=a,this.element=b.element,this.input_terminals={},this.output_terminals={},this.errors={},this.workflow_outputs=[]},getWorkflowOutput:function(a){return _.findWhere(this.workflow_outputs,{output_name:a})},isWorkflowOutput:function(a){return void 0!=this.getWorkflowOutput(a)},removeWorkflowOutput:function(a){for(;this.isWorkflowOutput(a);)this.workflow_outputs.splice(this.getWorkflowOutput(a),1)},addWorkflowOutput:function(a,b){if(!this.isWorkflowOutput(a)){var c={output_name:a};return b&&(c.label=b),this.workflow_outputs.push(c),!0}return!1},labelWorkflowOutput:function(a,b){var c=!1,d=null;if(this.isWorkflowOutput(a)){var e=this.getWorkflowOutput(a);d=e.label,e.label=b,c=d!=b}else c=this.addWorkflowOutput(a,b);return c&&(this.app.workflow.updateOutputLabel(d,b),this.markChanged(),this.nodeView.redrawWorkflowOutputs()),c},connectedOutputTerminals:function(){return this._connectedTerminals(this.output_terminals)},_connectedTerminals:function(a){var b=[];return $.each(a,function(a,c){c.connectors.length>0&&b.push(c)}),b},hasConnectedOutputTerminals:function(){var a=this.output_terminals;for(var b in a)if(a[b].connectors.length>0)return!0;return!1},connectedMappedInputTerminals:function(){return this._connectedMappedTerminals(this.input_terminals)},hasConnectedMappedInputTerminals:function(){var a=this.input_terminals;for(var b in a){var c=a[b];if(c.connectors.length>0&&c.isMappedOver())return!0}return!1},_connectedMappedTerminals:function(a){var b=[];return $.each(a,function(a,c){var d=c.mapOver();d.isCollection&&c.connectors.length>0&&b.push(c)}),b},mappedInputTerminals:function(){return this._mappedTerminals(this.input_terminals)},_mappedTerminals:function(a){var b=[];return $.each(a,function(a,c){var d=c.mapOver();d.isCollection&&b.push(c)}),b},hasMappedOverInputTerminals:function(){var a=!1;return _.each(this.input_terminals,function(b){var c=b.mapOver();c.isCollection&&(a=!0)}),a},redraw:function(){$.each(this.input_terminals,function(a,b){b.redraw()}),$.each(this.output_terminals,function(a,b){b.redraw()})},destroy:function(){$.each(this.input_terminals,function(a,b){b.destroy()}),$.each(this.output_terminals,function(a,b){b.destroy()}),this.app.workflow.remove_node(this),$(this.element).remove()},make_active:function(){$(this.element).addClass("toolForm-active")},make_inactive:function(){var a=this.element.get(0);!function(b){b.removeChild(a),b.appendChild(a)}(a.parentNode),$(a).removeClass("toolForm-active")},setLabel:function(a){this.app.workflow.updateNodeLabel(this.label,a),this.label=a||null},init_field_data:function(b){b.type&&(this.type=b.type),this.name=b.name,this.config_form=b.config_form,this.tool_state=b.tool_state,this.errors=b.errors,this.tooltip=b.tooltip?b.tooltip:"",this.annotation=b.annotation,this.post_job_actions=b.post_job_actions?b.post_job_actions:{},this.setLabel(b.label),this.uuid=b.uuid,this.workflow_outputs=b.workflow_outputs?b.workflow_outputs:[];var c=this,d=new a({el:this.element[0],node:c});c.nodeView=d,$.each(b.data_inputs,function(a,b){d.addDataInput(b)}),b.data_inputs.length>0&&b.data_outputs.length>0&&d.addRule(),$.each(b.data_outputs,function(a,b){d.addDataOutput(b)}),d.render(),this.app.workflow.node_changed(this,!0)},update_field_data:function(a){var b=this;if(nodeView=b.nodeView,this.tool_state=a.tool_state,this.config_form=a.config_form,this.errors=a.errors,this.annotation=a.annotation,this.setLabel(a.label),"post_job_actions"in a){var c=$.parseJSON(a.post_job_actions);this.post_job_actions=c?c:{}}b.nodeView.renderToolErrors();var d=nodeView.$("div.inputs"),e=nodeView.newInputsDiv(),f={};_.each(a.data_inputs,function(a){var c=b.nodeView.addDataInput(a,e);f[a.name]=c}),_.each(_.difference(_.values(nodeView.terminalViews),_.values(f)),function(a){a.el.terminal.destroy()}),nodeView.terminalViews=f,b.nodeView.render(),1==a.data_outputs.length&&"collection_type"in a.data_outputs[0]&&nodeView.updateDataOutput(a.data_outputs[0]),d.replaceWith(e),"workflow_outputs"in a&&(this.workflow_outputs=workflow_outputs?workflow_outputs:[]),this.markChanged(),this.redraw()},error:function(a){var b=$(this.element).find(".toolFormBody");b.find("div").remove();var c="<div style='color: red; text-style: italic;'>"+a+"</div>";this.config_form=c,b.html(c),this.app.workflow.node_changed(this)},markChanged:function(){this.app.workflow.node_changed(this)}});return b});
//# sourceMappingURL=../../../maps/mvc/workflow/workflow-node.js.map