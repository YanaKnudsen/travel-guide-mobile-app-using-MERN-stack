import {forwardRef, useCallback, useMemo, useRef} from "react";
import { observer } from "mobx-react";
import {
    BottomSheetModal,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import {StyleSheet,Text} from "react-native";


type BottomSheetProps={
    children?:React.ReactNode,
    firstSnapPoint:number,
    secondSnapPoint:number,
};
export type BottomSheetRefProps={
   // <BottomSheetRefProps,BottomSheetProps>
    // const bottomSheetModalRef = useRef<BottomSheetModal>(null);
};
//export type Ref = BottomSheetModal;


const BottomSheet=forwardRef<BottomSheetRefProps,BottomSheetProps>(function BottomSheet(props,ref){
    //const {label,...otherProps}=props;
    // variables
    const snapPoints = useMemo(() => [props.firstSnapPoint, props.secondSnapPoint], []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return(
        <BottomSheetModal ref={ref}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
        >
            <BottomSheetView style={styles.contentContainer}>
                {props.children}
            </BottomSheetView>
        </BottomSheetModal>
    )
});

const styles = StyleSheet.create({
    contentContainer:{
        height:"100%",
        display:"flex",
        flexDirection:"column",
        width:"100%",
        paddingHorizontal:15,
        paddingVertical:10,
    },

});




export default observer(BottomSheet);