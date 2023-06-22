import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7FFE5',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    registerWithText: {
        fontFamily: 'Open Sans',
        color: '#A0C49D',
        fontWeight: 'bold',
        marginVertical: 20
    },
    registerWithAppsContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    brandImage: {
        marginHorizontal: 10
    },
    nameContainer: {
        flex: 0.3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    nameTextBox: {
        height: 67,
        width: 150,
        borderWidth: 3,
        padding: 10,
        backgroundColor: '#FFFFFFBF',
        borderRadius: 15,
        borderColor: '#A0C49D7A',
        shadowOffset: { width: 2, height: 3 },
        shadowRadius: 3,
        shadowOpacity: 0.15,
        marginHorizontal: 15,
    },
    registerButtonContainer: {
        width: 330,
        height: 49,
        alignItems: 'center',
        backgroundColor: '#A0C49D',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 15,
    },
    registerButtonText: {
        fontFamily: 'Open Sans',
        color: '#FFFFFF',
        fontSize: 20,
    },
    registerHeaderText: {
        fontFamily: 'Open Sans',
        color: '#A0C49D',
        fontSize: 24,
        fontWeight: 'bold'
    },
    topHalf: {
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    bottomHalf: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    emailAndPasswordTextBox: {
        height: 67,
        width: 330,
        borderWidth: 3,
        padding: 10,
        backgroundColor: '#FFFFFFBF',
        borderRadius: 15,
        borderColor: '#A0C49D7A',
        shadowOffset: { width: 2, height: 3 },
        shadowRadius: 3,
        shadowOpacity: 0.15,
    }
})

export default styles;