import { BoardGame } from "./board_game";


describe('BoardGame Class', () => {
    let boardGame: BoardGame;

    beforeEach(() => {
        boardGame = new BoardGame(1, 'Monopoly', 500, 'Настільна гра для сімейних вечорів', 4, 60);
    });

    it('should return correct game info', () => {
        expect(boardGame.getInfo()).toBe('Monopoly - 500 грн. Для 4 гравців, тривалість 60 хв.');
    });

    it('should return correct players count', () => {
        expect(boardGame.getPlayersCount()).toBe(4);
    });

    it('should return correct duration', () => {
        expect(boardGame.getDuration()).toBe(60);
    });
});
