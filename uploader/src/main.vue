<template>
    <div class='uploader-wrapper'>
        <div class="uploader-wrapper-file preview-image" v-for="(item,index) in imageFileurl" :key="index">
            <img :src="item" alt="">
            <i v-show="deletable" @click="handleDelete(index)">x</i>
        </div>
        <div class="uploader-wrapper-file" v-if=" this.imageFileurl.length < maxLength">
            <input type="file" accept="image/*" ref="shopImage1File" @change="preview()" :value="value" :disabled="disabled" :multiple="multiple" /> 
            <img class="uploader-wrapper-icon" :src="uploader" alt="">
        </div>
    </div>
</template>

<script>
import uploader from './images/uploader.png'
export default {
    name:'LiUploader',
    props:{
        maxLength:{
            type:Number,
            default:1
        },
        disabled:{
            type:Boolean,
            default:false
        },
        deletable:{
            type:Boolean,
            default:true
        },
        maxSize:{
            type:[String,Number],
            default:10
        },
        multiple:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            uploader,
            imageFileurl:[], //预览图
            shopImageFile:[],//文件对象数组
            value:""
        };
    },
    methods: {
        preview(){
            let file = this.$refs.shopImage1File.files[0];
            this.value = '';

            /** 限制大小和格式 */
            const isLt2M = file.size / 1024 / 1024 < this.maxSize;
            var testmsg = file.name.substring(file.name.lastIndexOf('.')+1)                 
            const extension = testmsg === 'jpg'  
            const extension2 = testmsg === 'png'  
            if( !extension && !extension2 ) {  
                this.$emit('beyond','')
                return
            }  
            if(!isLt2M) { 
                this.$emit('beyond',file.size / 1024 / 1024 < this.maxSize)
                return
            }
            /** 正常上传 */
            if (file) {
                this.shopImageFile = [...this.shopImageFile,this.$refs.shopImage1File.files[0]]
                var reader = new FileReader();
                reader.onload = (evt) => {
                    this.imageFileurl.push(evt.target.result);
                }
                reader.readAsDataURL(file);
                this.$emit('input',this.shopImageFile)
            }
        },
        handleDelete(index){
            this.imageFileurl.splice(index,1)
            this.shopImageFile.splice(index,1)
            this.$emit('input',this.shopImageFile)
        }
    },
    created() {

    }
}
</script>
<style lang='css' scoped>
.uploader-wrapper {
    display: flex;
    flex-wrap: wrap;
}
.uploader-wrapper-file {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    margin: 0 8px 8px 0;
    background-color: #f7f8fa;
    border-radius: 8px;
}
.uploader-wrapper-file input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
    opacity: 0;
    cursor: pointer;
}
.uploader-wrapper-icon {
    width: 24px;
    height: 24px;
}
.preview-image  {
    position: relative;
}
.preview-image img {
    width: 100%;
    height: 100%;
    object-fit:cover;
    border-radius: 4px;
}
.preview-image i {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    -webkit-transform: translate(50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ddd;
    color: #fff;
    font-size: 12px;
    font-style: normal;
}
</style>